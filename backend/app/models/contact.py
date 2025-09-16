from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class ContactBase(BaseModel):
    first_name: str = Field(..., example="Ava")
    last_name: str = Field(..., example="Patel")
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    job_title: Optional[str] = None
    notes: Optional[str] = None
    created: Optional[datetime] = None

class ContactCreate(ContactBase):
    pass

class Contact(ContactBase):
    id: Optional[int] = None
    owner_email: Optional[EmailStr] = None

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "first_name": "Ava",
                "last_name": "Patel",
                "email": "ava@acme.com",
                "phone": "+91-9876543210",
                "company": "Acme",
                "job_title": "Manager",
                "notes": "Met at expo",
                "created": "2025-08-16T10:00:00Z",
                "owner_email": "user@example.com"
            }
        }
