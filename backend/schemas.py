from pydantic import BaseModel, Field
from decimal import Decimal
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    brand: Optional[str] = None
    category: str
    price: Decimal = Field(ge=0)
    description: Optional[str] = None
    stock: int = Field(default=0, ge=0)
    ingredients: Optional[str] = None
    allergens: Optional[str] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    price: Optional[Decimal] = Field(default=None, ge=0)
    description: Optional[str] = None
    stock: Optional[int] = Field(default=None, ge=0)
    ingredients: Optional[str] = None
    allergens: Optional[str] = None