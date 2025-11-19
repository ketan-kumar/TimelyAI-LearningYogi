# PaddleOCR Local OCR Service

A lightweight OCR microservice powered by **PaddleOCR** and **FastAPI**, designed for fast, offline text extraction from images and PDFs.  
This service is intended to be used as part of a multi-stage OCR pipeline (DeepSeek-OCR → PaddleOCR → Google Vision), but can also run standalone.

---

## 🚀 Features

- 🔤 High-quality OCR for images & PDFs  
- ⚡ Fast inference using PaddleOCR (CPU)  
- 🧠 Automatic text detection + angle classification  
- 🖼 Supports PNG, JPG, BMP, PDF  
- 📦 Clean REST API built with FastAPI  
- 🎯 Returns both extracted text & average confidence score  
- 💻 Easy to run locally — no GPU required  
- 🔌 Drop-in microservice for any backend  

---

## 📁 Project Structure

├── server.py # FastAPI OCR server
├── requirements.txt # Python dependencies
└── README.md


---

## 🧰 Installation

### 1. Create a virtual environment

  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt

### 2. Running the Server
  uvicorn server:app --host 0.0.0.0 --port 9999

  If everything worked, you will see:
  INFO:     Uvicorn running on http://0.0.0.0:9999

## API Usage

  POST /ocr
  Extracts text from an image or PDF passed in Base64 format.

  Request Body
  {
    "fileContentBase64": "<BASE64_STRING>",
    "mimeType": "image/png"
  }

  Response
  {
    "text": "Extracted text from the image",
    "confidence": 0.92
  }

## Supported MIME Types

    image/png
    image/jpeg
    image/jpg
    image/bmp
    application/pdf

## Example curl Test
  curl -X POST http://localhost:9999/ocr \
    -H "Content-Type: application/json" \
    -d '{
          "fileContentBase64": "'"$(base64 -i sample.png)"'",
          "mimeType": "image/png"
        }'

## Environment Requirements

Python 3.10+
macOS or Linux recommended
Internet connection required on first run (for downloading model weights)


## Dependencies (requirements.txt)

fastapi==0.115.0
uvicorn==0.38.0
paddlepaddle==2.6.1
paddleocr==2.7.1
pydantic==2.8.2
python-multipart==0.0.9
