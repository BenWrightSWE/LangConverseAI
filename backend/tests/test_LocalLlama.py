import pytest
from src import LocalLlama

# Fixture for client:
@pytest.fixture
def client():
    with LocalLlama.test_client() as client:
        yield client

def test_get_response(client):
    user_message = "Hello, what are you?"

    response = client.post('api/llamaResponse', json=user_message)

    assert response.status_code == 200

    json_data = response.get_json()
    print(json_data)