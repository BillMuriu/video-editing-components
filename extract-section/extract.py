import random
from pydub import AudioSegment

# Load the audio file
audio = AudioSegment.from_mp3("agent_fixed.mp3")

# Calculate start and end times (in milliseconds)
duration_ms = len(audio)
start_min = 2 * 60 * 1000  # 2 minutes in ms
segment_length = 30 * 1000  # 30 seconds in ms

# Ensure we don't go past the end
if duration_ms <= start_min + segment_length:
    raise ValueError("Audio is too short to extract a 30-second segment after 2 minutes.")

max_start = duration_ms - segment_length
start_ms = random.randint(start_min, max_start)
end_ms = start_ms + segment_length

# Extract the segment
segment = audio[start_ms:end_ms]

# Export the segment
segment.export("agent_30s.mp3", format="mp3")
print(f"Extracted 30s segment from {start_ms//1000}s to {end_ms//1000}s into agent_30s.mp3")
