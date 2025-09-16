from fastapi import APIRouter, Depends, HTTPException, Query, Body, status
from typing import List, Optional
from datetime import date, datetime
from pydantic import BaseModel

from app.services.supabase_client import supabase
from app.routes.auth import get_current_user
from app.models.contact import Contact, ContactCreate

router = APIRouter(prefix="/contacts", tags=["Contacts"])

class ContactResponse(BaseModel):
    message: str
    contact: Contact

@router.get("/", response_model=List[Contact])
def get_contacts(
    search: Optional[str] = Query(None, description="Search by first name"),
    limit: int = Query(100, description="Max results"),
    current_user: dict = Depends(get_current_user)
):
    try:
        q = supabase.table("contacts").select("*").eq("owner_email", current_user["email"])
        if search:
            q = q.ilike("first_name", f"%{search}%")
        res = q.order("created", desc=True).limit(limit).execute()
        return res.data or []
    except Exception as e:
        raise HTTPException(500, detail=f"Error fetching contacts: {e}")

@router.post("/", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
def create_contact(contact: ContactCreate, current_user: dict = Depends(get_current_user)):
    data = contact.dict(exclude_unset=True)
    data["owner_email"] = current_user["email"]
    if isinstance(data.get("created"), (date, datetime)):
        data["created"] = data["created"].isoformat()
    try:
        res = supabase.table("contacts").insert(data).execute()
        new_contact = res.data[0]
        return {"message": "Contact created successfully", "contact": new_contact}
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to create contact: {e}")

@router.put("/{contact_id}", response_model=Contact)
def update_contact(
    contact_id: int,
    payload: dict = Body(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        # ✳️ Only allow updating email + phone (you can expand later)
        allowed = {"email", "phone"}
        update = {k: v for k, v in payload.items() if k in allowed and v is not None}
        if not update:
            raise HTTPException(400, detail="No allowed fields to update (email, phone).")

        res = (
            supabase.table("contacts")
            .update(update)
            .eq("id", contact_id)
            .eq("owner_email", current_user["email"])
            .execute()
        )
        if not res.data:
            raise HTTPException(404, detail="Contact not found or not owned by current user")
        return res.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, detail=f"Error updating contact: {e}")

@router.delete("/{contact_id}")
def delete_contact(contact_id: int, current_user: dict = Depends(get_current_user)):
    existing = supabase.table("contacts").select("*").eq("id", contact_id).execute()
    if not existing.data:
        raise HTTPException(404, detail="Contact not found")

    user_role = current_user.get("role", "Sales")
    if user_role != "Admin" and existing.data[0]["owner_email"] != current_user["email"]:
        raise HTTPException(403, detail="Not authorized to delete this contact")

    try:
        supabase.table("contacts").delete().eq("id", contact_id).execute()
        return {"message": "Contact deleted successfully"}
    except Exception as e:
        raise HTTPException(500, detail=f"Failed to delete contact: {e}")
