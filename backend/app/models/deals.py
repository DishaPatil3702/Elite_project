#crm-sys/backend/app/models/deals.py
from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


# Base schema (common fields)
class DealBase(BaseModel):
    title: str
    company: Optional[str] = None
    value: Optional[float] = 0.0
    stage: Optional[str] = "new"  # can be new, qualified, proposal, negotiation, won, lost
    lead_id: Optional[int] = None
    owner_id: Optional[int] = None
    close_date: Optional[date] = None
    notes: Optional[str] = None


# Schema for creating a deal
class DealCreate(DealBase):
    pass


# Schema for updating a deal
class DealUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    value: Optional[float] = None
    stage: Optional[str] = None
    lead_id: Optional[int] = None
    owner_id: Optional[int] = None
    close_date: Optional[date] = None
    notes: Optional[str] = None


# Schema for response (includes auto fields)
class Deal(DealBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True  # ✅ Pydantic v2 replacement for orm_mode
