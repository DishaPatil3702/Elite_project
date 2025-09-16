#crm-sys/backend/app/routes/deals.py
from fastapi import APIRouter, HTTPException
from app.models.deals import Deal, DealCreate, DealUpdate
from app.services.supabase_client import supabase

router = APIRouter(prefix="/deals", tags=["Deals"])

# Get all deals
# Get all deals, most recent first
@router.get("/", response_model=list[Deal])
async def get_deals():
    response = (
        supabase.table("deals")
        .select("*")
        .order("created_at", desc=True)  # ← order by created_at descending
        .execute()
    )
    if not response.data:
        return []  # return empty list if no deals
    return response.data


# Get a single deal
@router.get("/{deal_id}", response_model=Deal)
async def get_deal(deal_id: int):
    response = supabase.table("deals").select("*").eq("id", deal_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Deal not found")
    return response.data

# Create deal
@router.post("/", response_model=Deal)
async def create_deal(deal: DealCreate):
    deal_dict = deal.dict()
    # convert date to string if exists
    if "close_date" in deal_dict and deal_dict["close_date"]:
        deal_dict["close_date"] = str(deal_dict["close_date"])

    response = supabase.table("deals").insert(deal_dict).execute()
    if not response.data:
        raise HTTPException(status_code=400, detail="Failed to create deal")
    return response.data[0]

# Update deal
@router.put("/{deal_id}", response_model=Deal)
async def update_deal(deal_id: int, deal: DealUpdate):
    update_data = deal.dict(exclude_unset=True)
    if "close_date" in update_data and update_data["close_date"]:
        update_data["close_date"] = str(update_data["close_date"])

    response = supabase.table("deals").update(update_data).eq("id", deal_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Deal not found or update failed")
    return response.data[0]

# Delete deal
@router.delete("/{deal_id}")
async def delete_deal(deal_id: int):
    response = supabase.table("deals").delete().eq("id", deal_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Deal not found or already deleted")
    return {"message": "Deal deleted successfully"}
