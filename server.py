from fastapi import FastAPI
from pydantic import BaseModel
from paddleocr import PaddleOCR
import base64
import tempfile

app = FastAPI()
ocr = PaddleOCR(use_angle_cls=True, lang='en')

class OcrRequest(BaseModel):
    fileContentBase64: str
    mimeType: str | None = None

@app.post("/ocr")
def run_ocr(req: OcrRequest):
    print('req ------', req);
    data = base64.b64decode(req.fileContentBase64)
    # pick suffix based on MIME
    suffix = ".png"
    if req.mimeType == "application/pdf":
        suffix = ".pdf"
    elif req.mimeType in ("image/jpeg", "image/jpg"):
        suffix = ".jpg"
    elif req.mimeType == "image/bmp":
        suffix = ".bmp"
    # create tmp file with that suffix
    with tempfile.NamedTemporaryFile(suffix=suffix) as tmp:
        tmp.write(data)
        tmp.flush()
        result = ocr.ocr(tmp.name)
    text = " ".join(line[1][0] for block in result for line in block)
    # naive average confidence
    scores = [line[1][1] for block in result for line in block]
    confidence = sum(scores) / len(scores) if scores else 0.0
    return {"text": text, "confidence": confidence}
