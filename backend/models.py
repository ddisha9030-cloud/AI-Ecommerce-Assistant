from sqlalchemy import Column, Integer, String, Text, Numeric, CheckConstraint
from database import Base


class Product(Base):
    __tablename__ = "products"

    product_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    brand = Column(String(100))
    category = Column(String(100), nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    description = Column(Text)
    stock = Column(Integer, default=0)
    ingredients = Column(Text)
    allergens = Column(Text)

    __table_args__ = (
        CheckConstraint("price >= 0", name="check_product_price"),
        CheckConstraint("stock >= 0", name="check_product_stock"),
    )