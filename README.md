# timetable-ai-extractor
A full-stack AI-powered system for extracting, parsing, and standardizing teacher timetables from PDFs, images, and scanned documents.

The project uses an OCR pipeline (DeepSeek-OCR / PaddleOCR) combined with LLM reasoning (DeepSeek-R1 via Ollama) to convert unstructured timetable documents into a normalized, machine-readable format.

Features include file upload, local OCR fallback, LLM-based block interpretation, and a frontend UI to visualize the reconstructed timetable.
