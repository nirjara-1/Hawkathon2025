async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:5000/classify", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  document.getElementById("result").innerText = `Label: ${data.label}, Confidence: ${(data.confidence * 100).toFixed(2)}%`;
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    alert("Login successful!");
  } else {
    alert("Invalid credentials.");
  }
}
