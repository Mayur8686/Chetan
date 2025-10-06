#!/usr/bin/env python3
import os

# 1) Define your folder structure
folders = [
    "assets/css",
    "assets/js",
    "assets/images",
    "assets/docs"
]
for f in folders:
    os.makedirs(f, exist_ok=True)

# 2) Define filenames and contents
files = {
  "index.html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Use & Misuse of Cell Phones</title>
  <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="uses.html">Uses</a>
    <a href="misuses.html">Misuses</a>
    <a href="video.html">Video</a>
  </nav>
  <header class="hero">
    <h1>Cell Phones — Our Smartest Tool or Our Biggest Distraction?</h1>
    <p>Explore the benefits and pitfalls of mobile technology.</p>
    <div class="cta-buttons">
      <a href="uses.html" class="btn">Learn Uses</a>
      <a href="misuses.html" class="btn btn--danger">Learn Misuses</a>
      <a href="video.html" class="btn btn--video">Watch Video</a>
    </div>
  </header>
  <footer>
    <p>© 2024 Cell Phone Awareness Project</p>
  </footer>
  <script src="assets/js/main.js"></script>
</body>
</html>
""",
  "team.html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Our Team</title>
  <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body>
  <nav>…</nav>
  <section class="team">
    <h2>Meet the Team</h2>
    <div class="team-grid">
      <!-- Repeat per member -->
      <div class="team-card">
        <img src="assets/images/alice.jpg" alt="Alice Smith"/>
        <h3>Alice Smith</h3>
        <p>Project Lead</p>
        <div class="social-links">
          <a href="#">LinkedIn</a> | <a href="#">GitHub</a>
        </div>
      </div>
    </div>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "problem.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Problem Statement</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Problem Statement</h2>
    <p>Phone misuse impacts students’ concentration, mental health, and productivity.</p>
    <div class="infographics">
      <img src="assets/images/screen-time.png" alt="Average Screen Time"/>
      <p>Average screen time per day: <strong>7 hours</strong></p>
    </div>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "idea.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Project Idea & Aim</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Our Aim</h2>
    <p>We want to help users strike a balance between productive and problematic phone use.</p>
    <div class="illustration">
      <img src="assets/images/balance.svg" alt="Balance"/>
    </div>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "objectives.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Objectives</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Objectives</h2>
    <div class="cards">
      <div class="card"><span>✅</span> Identify uses</div>
      <div class="card"><span>🚫</span> Identify misuses</div>
      <div class="card"><span>💡</span> Explain effects</div>
      <div class="card"><span>🧭</span> Suggest solutions</div>
    </div>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "workflow.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Work Flow</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Our Process</h2>
    <ol class="timeline">
      <li>1️⃣ Research</li>
      <li>2️⃣ Collect Data</li>
      <li>3️⃣ Analyze</li>
      <li>4️⃣ Suggest</li>
      <li>5️⃣ Conclude</li>
    </ol>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "uses.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Uses of Cell Phones</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Benefits of Mobile Phones</h2>
    <div class="grid">
      <div class="item"><h3>Communication</h3><p>Instant messaging, video calls, etc.</p></div>
      <div class="item"><h3>Education</h3><p>e-learning apps, research on the go.</p></div>
      <!-- …other uses… -->
    </div>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "misuses.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Misuses of Cell Phones</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Common Misuses</h2>
    <ul class="misuse-list">
      <li>📱 Addiction</li>
      <li>⌛ Time waste</li>
      <li>⚠️ Road accidents</li>
      <!-- … -->
    </ul>
    <div id="quiz">
      <h3>Are You Addicted to Your Phone?</h3>
      <!-- quiz goes here -->
    </div>
  </section>
  <footer>…</footer>
  <script src="assets/js/quiz.js"></script>
</body>
</html>
""",
  "solutions.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Solutions</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Tips & Recommendations</h2>
    <ul class="tips">
      <li>📱 Limit screen time</li>
      <li>👨‍👩‍👧 Parental guidance</li>
      <li>🚫 Avoid during meals/driving</li>
      <li>⏰ Use digital wellbeing apps</li>
    </ul>
    <a href="assets/docs/digital_balance.pdf" download>Download Digital Balance Tips (PDF)</a>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "geotag-photos.html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>GeoTag Photos</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
</head>
<body>
  <nav>…</nav>
  <section>
    <h2>Where We Collected Data</h2>
    <div id="map" style="height: 400px;"></div>
  </section>
  <footer>…</footer>
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(map);
    // Add markers…
  </script>
</body>
</html>
""",
  "video.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Awareness Video</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section>
    <h2>Watch Our Awareness Video</h2>
    <div class="video-container">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    </div>
    <p>Subtitle or summary here.</p>
  </section>
  <footer>…</footer>
</body>
</html>
""",
  "conclusion.html": """<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Conclusion</title><link rel="stylesheet" href="assets/css/styles.css"/></head>
<body>
  <nav>…</nav>
  <section class="conclusion">
    <h2>Conclusion</h2>
    <p>Balance and self-control is the key to smart phone use.</p>
    <blockquote>“Technology is a useful servant but a dangerous master.”</blockquote>
  </section>
  <footer>…</footer>
</body>
</html>
"""
}

# 3) Write them out
for fname, content in files.items():
    with open(fname, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✔️  Created {fname}")

print("\n🎉 All files generated! Now just add your CSS/JS and assets.") 
 