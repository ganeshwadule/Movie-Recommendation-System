import sys
import joblib
import numpy as np
import pandas as pd

# Load the model
model = joblib.load('../../model-training/model.pkl')

# Sample data for movies
movies = {
    101: 'Movie A',
    102: 'Movie B',
    103: 'Movie C',
    104: 'Movie D',
    105: 'Movie E'
}

# Sample data for training
data = {
    'user_id': [1, 1, 1, 2, 2, 2, 3, 3, 3],
    'movie_id': [101, 102, 103, 101, 102, 104, 103, 104, 105],
    'rating': [5, 4, 3, 5, 4, 2, 3, 4, 5]
}

df = pd.DataFrame(data)

# Pivot the data to create a user-movie matrix
user_movie_matrix = df.pivot(index='user_id', columns='movie_id', values='rating').fillna(0)

# Parse input arguments
user_id = int(sys.argv[1])

# Find similar users
distances, indices = model.kneighbors(user_movie_matrix.loc[user_id].values.reshape(1, -1), n_neighbors=3)

# Get movie recommendations
similar_user_indices = indices.flatten()
similar_user_ids = user_movie_matrix.index[similar_user_indices]
recommended_movies = set()

for similar_user_id in similar_user_ids:
    similar_user_ratings = user_movie_matrix.loc[similar_user_id]
    recommended_movies.update(similar_user_ratings[similar_user_ratings > 0].index)

# Remove movies already rated by the user
user_rated_movies = set(user_movie_matrix.loc[user_id][user_movie_matrix.loc[user_id] > 0].index)
recommended_movies.difference_update(user_rated_movies)

# Convert to movie names
recommended_movie_names = [movies[movie_id] for movie_id in recommended_movies]

print(recommended_movie_names)
