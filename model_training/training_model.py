import pandas as pd
from sklearn.neighbors import NearestNeighbors
import joblib

# Sample data for training
# Columns: user_id, movie_id, rating
data = {
    'user_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],
    'movie_id': [101, 102, 103, 101, 102, 104, 103, 104, 105],
    'rating': [5, 4, 3, 5, 4, 2, 3, 4, 5]
}

df = pd.DataFrame(data)

# Pivot the data to create a user-movie matrix
user_movie_matrix = df.pivot(index='user_id', columns='movie_id', values='rating').fillna(0)

# Initialize and train the model
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(user_movie_matrix)

# Save the model
joblib.dump(model, 'model.pkl')
