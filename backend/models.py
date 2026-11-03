from sqlalchemy import ForeignKey, DateTime, func
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

    
class UserInteraction(Base):
    __tablename__ = "user_interactions"

    interaction_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(100), nullable=False)

    product_id = Column(
        Integer,
        ForeignKey("products.product_id", ondelete="CASCADE"),
        nullable=False
    )

    interaction_type = Column(String(30), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )
