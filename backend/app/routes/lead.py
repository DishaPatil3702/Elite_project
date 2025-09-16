# app/routes/lead.py
from fastapi import APIRouter, Depends, HTTPException, Query, Body, status


from typing import List, Optional
from datetime import date, datetime
from pydantic import BaseModel

from app.services.supabase_client import supabase
from app.routes.auth import get_current_user
from app.models.lead import Lead, LeadCreate  # ✅ Using models

router = APIRouter(
    prefix="/leads",
    tags=["Leads"]
)

# ----------------------------
# Response Schema (for Create)
# ----------------------------
class LeadResponse(BaseModel):
    message: str
    lead: Lead
# ----------------------------
# Get Leads
# ----------------------------
@router.get("/", response_model=List[Lead])
def get_leads(
    status: Optional[str] = Query(None, description="Filter by lead status"),
    search: Optional[str] = Query(None, description="Search first/last/company/email"),
    limit: int = Query(100, description="Max number of results"),
    offset: int = Query(0, description="Offset for pagination"),
    current_user: dict = Depends(get_current_user)
):
    try:
        q = supabase.table("leads").select("*").eq("owner_email", current_user["email"])

        if status:
            q = q.eq("status", status)

        if search:
            like = f"%{search}%"
            # first_name OR last_name OR company OR email (case-insensitive)
            q = q.or_(
                f"first_name.ilike.{like},last_name.ilike.{like},company.ilike.{like},email.ilike.{like}"
            )

        result = (
    q.order("created", desc=True)  # 🔹 sort by created timestamp descending
     .range(offset, offset + limit - 1)
     .execute()
)

        return result.data or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching leads: {str(e)}")

# ----------------------------
# Create Lead
# ----------------------------
@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate, current_user: dict = Depends(get_current_user)):
    lead_data = lead.dict(exclude_unset=True)
    lead_data["owner_email"] = current_user["email"]

    if isinstance(lead_data.get("created"), (date, datetime)):
        lead_data["created"] = lead_data["created"].isoformat()

    try:
        result = supabase.table("leads").insert(lead_data).execute()
        new_lead = result.data[0]
        return {"message": "Lead created successfully", "lead": new_lead}  # ✅ wrapped response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create lead: {str(e)}")

# ----------------------------
# Update Lead
# ----------------------------
@router.put("/{lead_id}", response_model=Lead)
def update_lead(lead_id: int, lead: dict = Body(...), current_user: dict = Depends(get_current_user)):
    try:
        lead_data = {k: v for k, v in lead.items() if v is not None}
        if not lead_data:
            raise HTTPException(status_code=400, detail="No fields to update")

        if "created" in lead_data and isinstance(lead_data["created"], (date, datetime)):
            lead_data["created"] = lead_data["created"].isoformat()

        result = (
            supabase.table("leads")
            .update(lead_data)
            .eq("id", lead_id)
            .eq("owner_email", current_user["email"])
            .execute()
        )

        if not result.data:
            raise HTTPException(status_code=404, detail="Lead not found or not owned by current user")

        lead_response = result.data[0]
        return lead_response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating lead: {str(e)}")

# ----------------------------
# Delete Lead
# ----------------------------
@router.delete("/{lead_id}")
def delete_lead(lead_id: int, current_user: dict = Depends(get_current_user)):
    existing = supabase.table("leads").select("*").eq("id", lead_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Lead not found")
    
    user_role = current_user.get("role", "Sales")
    if user_role != "Admin" and existing.data[0]["owner_email"] != current_user["email"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this lead")
    
    try:
        supabase.table("leads").delete().eq("id", lead_id).execute()
        return {"message": "Lead deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete lead: {str(e)}")
