
async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/classify", {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  document.getElementById("result").innerText = `Label: ${data.label}, Confidence: ${(data.confidence * 100).toFixed(2)}%`;

  matchWithLocalNGO(data.label);
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  alert(username === "admin" && password === "1234" ? "Login successful!" : "Invalid credentials.");
}

async function matchWithLocalNGO(label) {
  const response = await fetch("nonprofits.json");
  const ngos = await response.json();
  const match = ngos.find(npo => npo.needs.includes(label));
  const result = document.getElementById("result");
  if (match) {
    result.innerText += `
Matched with: ${match.name}`;
  } else {
    result.innerText += `
No matching nonprofit found.`;
  }
}
