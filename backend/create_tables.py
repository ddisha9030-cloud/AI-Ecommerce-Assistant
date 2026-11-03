from database import engine, Base
from models import Product, UserInteraction

Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")