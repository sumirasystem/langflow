from langflow.database.models.flow import Flow
from langflow.processing.process import process_graph_cached
from langflow.utils.logger import logger
from importlib.metadata import version

from fastapi import APIRouter, Depends, HTTPException

from langflow.api.v1.schemas import (
    PredictRequest,
    PredictResponse,
)

from langflow.interface.types import build_langchain_types_dict
from langflow.database.base import get_session
from sqlmodel import Session

# build router
router = APIRouter(tags=["Base"])


@router.get("/all")
def get_all():
    return build_langchain_types_dict()


@router.post("/predict/{flow_id}", status_code=200, response_model=PredictResponse)
async def get_load(
    predict_request: PredictRequest,
    flow_id: str,
    session: Session = Depends(get_session),
):
    try:
        flow_obj = session.get(Flow, flow_id)
        if flow_obj is None:
            raise ValueError(f"Flow {flow_id} not found")
        graph_data = flow_obj.data
        response = process_graph_cached(graph_data, predict_request.message)
        return PredictResponse(
            result=response.get("result", ""),
            intermediate_steps=response.get("thought", ""),
        )
    except Exception as e:
        # Log stack trace
        logger.exception(e)
        raise HTTPException(status_code=500, detail=str(e)) from e


# get endpoint to return version of langflow
@router.get("/version")
def get_version():
    return {"version": version("langflow")}