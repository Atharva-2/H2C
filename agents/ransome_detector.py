import os
import time
import hashlib
import requests
import geocoder
import psutil
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

API_URL = "http://localhost:5000/api/threats/report" 

SUSPICIOUS_PROCESSES = ["encryptor.exe", "ransomware.exe", "unknown.exe", "test_malware.exe","test_malware.py"]

def detect_suspicious_processes():
    """ Check for suspicious processes running """
    for process in psutil.process_iter(["pid", "name", "cpu_percent"]):
        if process.info["name"].lower() in SUSPICIOUS_PROCESSES:
            print(f"[ALERT] Suspicious process detected: {process.info['name']}")
            send_alert(f"Suspicious Process: {process.info['name']} found")
            kill_process(process.info["pid"])

def kill_process(pid):
    """ Kill a ransomware process """
    try:
        psutil.Process(pid).terminate()
        print(f"Process {pid} terminated.")
    except Exception as e:
        print(f"Failed to terminate process: {e}")

def get_location():
    try:
        g = geocoder.ip("me")  # Gets current public IP's location
        if g.latlng:
            return {"latitude": g.latlng[0], "longitude": g.latlng[1]}
        else:
            return {"latitude": "Unknown", "longitude": "Unknown"}
    except Exception as e:
        print(f"[ERROR] Failed to get location: {str(e)}")
        return {"latitude": "Unknown", "longitude": "Unknown"}

def send_alert( description):
    location = get_location()

    data = {
        "type": "RANSOMWARE",
        "description": description,
        "location":{ "lat": location["latitude"], "lon": location["longitude"]},
        "severity": "High"
    }

    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 201:
            print(f"[ALERT SENT] Threat reported due to {description}")
        else:
            print(f"[ERROR] Failed to report threat: {response.text}")
    except Exception as e:
        print(f"[ERROR] API request failed: {str(e)}")

# Track file hashes to detect sudden encryption
file_hashes = {}

class RansomwareMonitor(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return
        
        file_path = event.src_path
        file_hash = hash_file(file_path)

        # If the file was modified & hash is different, it might be encrypted
        if file_path in file_hashes and file_hashes[file_path] != file_hash:
            print(f"[ALERT] Possible ransomware detected: {file_path}")
            send_alert("Suspicious file encryption activity detected.")
            report_threat(file_path)

        file_hashes[file_path] = file_hash

def hash_file(file_path):
    """ Generate a hash for the file """
    try:
        with open(file_path, "rb") as f:
            return hashlib.sha256(f.read()).hexdigest()
    except Exception:
        return None

def report_threat(file_path):
    """ Report detected threat to the backend """
    data = {"type": "Ransomware", "location": file_path, "description": "Possible ransomware detected"}
    try:
        requests.post(API_URL, json=data)
    except Exception as e:
        print(f"Failed to report threat: {e}")

def start_monitoring(path="."):
    """ Start monitoring the file system """
    event_handler = RansomwareMonitor()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()

if __name__ == "__main__":
    print("🔍 Monitoring for ransomware activity...")
    start_monitoring("C:\\Users\\User\\Documents")  # Change the path if needed
    detect_suspicious_processes()