import logging
import random
import uuid
from datetime import datetime

from fastapi import APIRouter, Query

logger = logging.getLogger(__name__)
router = APIRouter()

PEOPLE_INSIGHTS = {
    "luke skywalker": "A legendary Jedi Knight who brought balance to the Force. Despite humble beginnings on Tatooine, his destiny was intertwined with the galaxy's fate. Known for his unwavering hope and belief in redemption.",
    "darth vader": "Once a heroic Jedi Knight, Anakin Skywalker fell to the dark side becoming the Empire's most feared enforcer. His eventual redemption through his son Luke proved that good still existed within him.",
    "leia organa": "Princess, Senator, General - Leia Organa wore many titles but remained a symbol of rebellion and hope. Her leadership and diplomatic skills were matched only by her courage in battle.",
    "han solo": "From smuggler to general, Han Solo's journey exemplifies the power of choosing the right side. His wit, charm, and the fastest ship in the galaxy made him an invaluable ally to the Rebellion.",
    "yoda": "For 900 years, Master Yoda trained Jedi. His wisdom transcends his small stature, teaching that size matters not when it comes to the Force. His unique speech pattern has become legendary.",
}

PLANET_INSIGHTS = {
    "tatooine": "A harsh desert world orbiting twin suns, Tatooine seems insignificant yet plays a pivotal role in galactic history. Home to both Anakin and Luke Skywalker, destiny seems drawn to this remote planet.",
    "alderaan": "Once a beacon of art, culture, and peace, Alderaan's destruction by the Death Star became a rallying cry for the Rebellion. Its legacy lives on through Princess Leia and the survivors.",
    "hoth": "An ice planet so cold that most technology fails to function properly. The Rebel Alliance's Echo Base proved that even the most inhospitable worlds can serve strategic purposes.",
    "dagobah": "A swamp planet strong with the Force, Dagobah served as Yoda's exile home. Its challenging environment provided the perfect training ground for Luke Skywalker's Jedi education.",
    "coruscant": "The galaxy's political center, Coruscant is one giant city covering an entire planet. Home to the Senate and later the Emperor, it represents both democracy's heights and the Empire's control.",
}

GENERIC_INSIGHTS = [
    "A mysterious figure whose story intertwines with the greater galactic narrative. Their actions, though not widely known, contributed to shaping the events we know today.",
    "Records indicate this individual played a role in various conflicts across the galaxy. Their legacy continues to influence those who remember their deeds.",
    "An enigmatic character whose true motivations remain unclear. Historical accounts suggest they operated in the shadows of major galactic events.",
]


@router.get("/simulate-ai-insight")
async def get_ai_insight(
    name: str = Query(
        ..., description="Name of the person or planet to get insights about"
    ),
):
    """
    Get AI-generated insights about a Star Wars character or planet.
    """
    logger.info(f"AI insight requested for: {name}")

    normalized_name = name.lower().strip()

    # Auto-detect type if needed
    if normalized_name in PEOPLE_INSIGHTS:
        insight = PEOPLE_INSIGHTS[normalized_name]
    elif normalized_name in PLANET_INSIGHTS:
        insight = PLANET_INSIGHTS[normalized_name]
    else:
        logger.warning(
            f"Tried to get insight for unknown entity: {name}, using generic insight"
        )
        insight = random.choice(GENERIC_INSIGHTS)

    # Here i'm just imitating OpenAI's standard response
    response = {
        "id": uuid.uuid4(),
        "object": "response",
        "created_at": datetime.now().timestamp(),
        "status": "completed",
        "error": None,
        "model": "gpt-4.1-2025-04-14",
        "output": [
            {
                "type": "message",
                "id": "msg_67ccd2bf17f0819081ff3bb2cf6508e60bb6a6b452d3795b",
                "status": "completed",
                "role": "assistant",
                "content": [
                    {
                        "type": "output_text",
                        "text": insight,
                        "annotations": [],
                    }
                ],
            }
        ],
        "temperature": 1.0,
        "text": {"format": {"type": "text"}},
        "usage": {
            "input_tokens": 36,
            "input_tokens_details": {"cached_tokens": 0},
            "output_tokens": 87,
            "output_tokens_details": {"reasoning_tokens": 0},
            "total_tokens": 123,
        },
    }

    logger.info(
        f"Generated insight for {name}, tokens used: {response['usage']['total_tokens']}"
    )

    return response
