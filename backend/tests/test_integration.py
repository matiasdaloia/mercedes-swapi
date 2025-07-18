from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


class TestHealthEndpoint:
    def test_health_check(self):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}


class TestPeopleEndpoint:
    def test_get_people_default(self):
        """Test getting people with default parameters"""
        response = client.get("/api/v1/people")
        assert response.status_code == 200

        data = response.json()
        assert "results" in data
        assert "count" in data
        assert "page" in data
        assert "total_pages" in data
        assert "next" in data
        assert "previous" in data

        # Check pagination (15 items per page)
        assert len(data["results"]) <= 15
        assert data["page"] == 1
        assert data["previous"] is False

    def test_get_people_pagination(self):
        """Test pagination functionality"""
        response = client.get("/api/v1/people?page=2")
        assert response.status_code == 200

        data = response.json()
        assert data["page"] == 2
        assert data["previous"] is True

    def test_get_people_search(self):
        """Test search functionality with case-insensitive partial match"""
        response = client.get("/api/v1/people?search=sky")
        assert response.status_code == 200

        data = response.json()
        assert len(data["results"]) > 0

        # Verify all results contain "sky" (case-insensitive)
        for person in data["results"]:
            assert "sky" in person["name"].lower()

    def test_get_people_sort_by_name_asc(self):
        """Test sorting by name in ascending order"""
        response = client.get("/api/v1/people?sort_by=name&order=asc")
        assert response.status_code == 200

        data = response.json()
        names = [p["name"] for p in data["results"]]
        assert names == sorted(names, key=str.lower)

    def test_get_people_sort_by_name_desc(self):
        """Test sorting by name in descending order"""
        response = client.get("/api/v1/people?sort_by=name&order=desc")
        assert response.status_code == 200

        data = response.json()
        names = [p["name"] for p in data["results"]]
        assert names == sorted(names, key=str.lower, reverse=True)

    def test_get_people_sort_by_created(self):
        """Test sorting by created date"""
        response = client.get("/api/v1/people?sort_by=created&order=asc")
        assert response.status_code == 200

        data = response.json()
        assert len(data["results"]) > 0


class TestPlanetsEndpoint:
    def test_get_planets_default(self):
        """Test getting planets with default parameters"""
        response = client.get("/api/v1/planets")
        assert response.status_code == 200

        data = response.json()
        assert "results" in data
        assert "count" in data
        assert "page" in data
        assert "total_pages" in data

        # Check pagination (15 items per page)
        assert len(data["results"]) <= 15

    def test_get_planets_search(self):
        """Test planet search functionality"""
        response = client.get("/api/v1/planets?search=tat")
        assert response.status_code == 200

        data = response.json()
        assert len(data["results"]) > 0

        # Verify all results contain "tat" (case-insensitive)
        for planet in data["results"]:
            assert "tat" in planet["name"].lower()

    def test_get_planets_sort(self):
        """Test planet sorting"""
        response = client.get("/api/v1/planets?sort_by=name&order=desc")
        assert response.status_code == 200

        data = response.json()
        names = [p["name"] for p in data["results"]]
        assert names == sorted(names, key=str.lower, reverse=True)


class TestAIInsightEndpoint:
    def test_simulate_ai_insight_person(self):
        """Test AI insight for a known person"""
        response = client.get(
            "/api/v1/simulate-ai-insight?name=Luke Skywalker"
        )
        assert response.status_code == 200

        data = response.json()
        # Check OpenAI-style response format
        assert "id" in data
        assert "object" in data
        assert "created_at" in data
        assert "status" in data
        assert "model" in data
        assert "output" in data
        assert "usage" in data

        # Check the actual content
        assert data["status"] == "completed"
        assert len(data["output"]) > 0
        assert data["output"][0]["role"] == "assistant"
        assert len(data["output"][0]["content"]) > 0
        
        # Extract the actual insight text
        insight_text = data["output"][0]["content"][0]["text"]
        assert "Jedi" in insight_text
        assert len(insight_text) > 50

    def test_simulate_ai_insight_planet(self):
        """Test AI insight for a known planet"""
        response = client.get("/api/v1/simulate-ai-insight?name=Tatooine")
        assert response.status_code == 200

        data = response.json()
        assert data["status"] == "completed"
        
        # Extract the actual insight text
        insight_text = data["output"][0]["content"][0]["text"]
        assert "desert" in insight_text or "twin suns" in insight_text
        assert len(insight_text) > 50

    def test_simulate_ai_insight_auto_detect(self):
        """Test AI insight with auto-detection"""
        response = client.get("/api/v1/simulate-ai-insight?name=Darth Vader")
        assert response.status_code == 200

        data = response.json()
        insight_text = data["output"][0]["content"][0]["text"]
        assert "dark side" in insight_text or "Vader" in insight_text

    def test_simulate_ai_insight_unknown_entity(self):
        """Test AI insight for unknown entity"""
        response = client.get("/api/v1/simulate-ai-insight?name=Unknown Character")
        assert response.status_code == 200

        data = response.json()
        assert data["status"] == "completed"
        # Should get a generic insight
        insight_text = data["output"][0]["content"][0]["text"]
        assert len(insight_text) > 50


class TestErrorHandling:
    def test_invalid_page_number(self):
        """Test handling of invalid page numbers"""
        response = client.get("/api/v1/people?page=0")
        assert response.status_code == 422

    def test_invalid_sort_field(self):
        """Test handling of invalid sort fields"""
        response = client.get("/api/v1/people?sort_by=invalid_field")
        assert response.status_code == 422

    def test_invalid_sort_order(self):
        """Test handling of invalid sort order"""
        response = client.get("/api/v1/people?order=invalid_order")
        assert response.status_code == 422


class TestCombinedFunctionality:
    def test_search_and_sort_combined(self):
        """Test combining search and sort functionality"""
        response = client.get("/api/v1/people?search=a&sort_by=name&order=asc")
        assert response.status_code == 200

        data = response.json()
        # Verify results contain search term
        for person in data["results"]:
            assert "a" in person["name"].lower()

        # Verify results are sorted
        names = [p["name"] for p in data["results"]]
        assert names == sorted(names, key=str.lower)

    def test_pagination_with_search(self):
        """Test pagination works correctly with search"""
        # First page
        response1 = client.get("/api/v1/people?search=a&page=1")
        assert response1.status_code == 200
        data1 = response1.json()

        if data1["total_pages"] > 1:
            # Second page
            response2 = client.get("/api/v1/people?search=a&page=2")
            assert response2.status_code == 200
            data2 = response2.json()

            # Ensure different results
            assert data1["results"] != data2["results"]
