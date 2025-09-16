# app/api/reports.py
from fastapi import APIRouter, HTTPException
from app.services.supabase_client import supabase

router = APIRouter(prefix="/reports", tags=["Reports"])

# Deals by stage
@router.get("/deals-by-stage")
async def deals_by_stage():
    response = supabase.table("deals").select("stage").execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="No deals found")

    stages = {}
    for row in response.data:
        stage = row["stage"]
        stages[stage] = stages.get(stage, 0) + 1
    return stages


# Revenue by month
@router.get("/revenue-by-month")
async def revenue_by_month():
    response = supabase.rpc("revenue_by_month").execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="No revenue data found")
    return response.data


# Top performing sales reps
@router.get("/top-sales")
async def top_sales():
    response = supabase.rpc("top_sales_reps").execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="No sales data found")
    return response.data


# Conversion rate (leads → deals → won)
@router.get("/conversion-rate")
async def conversion_rate():
    leads_resp = supabase.table("leads").select("id", count="exact").execute()
    deals_resp = supabase.table("deals").select("id", count="exact").execute()
    won_resp = supabase.table("deals").select("id", count="exact").eq("stage", "won").execute()

    leads_count = leads_resp.count or 0
    deals_count = deals_resp.count or 0
    won_deals_count = won_resp.count or 0

    return {
        "leads": leads_count,
        "deals": deals_count,
        "won_deals": won_deals_count,
        "conversion_rate": (won_deals_count / leads_count * 100) if leads_count else 0
    }
