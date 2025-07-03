document.getElementById("button1").addEventListener("click", (e) => {
  let div1 = document.getElementById("div1");
  let div6 = document.getElementById("div6");
  let cloneNode = div1.cloneNode(true);
  console.log("cloneNode: ", cloneNode);

  let removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");
  removeButton.setAttribute("value", "Remove");

  removeButton.addEventListener("click", () => {
    cloneNode.remove();
  });

  cloneNode.appendChild(removeButton);
  div6.appendChild(cloneNode);

  let inputs = cloneNode.querySelectorAll("input");
  inputs.forEach((input) => {
    if (
      input.type != "button" &&
      input.type != "reset" &&
      input.type != "radio" &&
      input.type != "submit"
    ) {
      input.value = "";
    }
  });
});

document.getElementById("button2").addEventListener("click", (e) => {
  let div11 = document.getElementById("div11");
  let div8 = document.getElementById("div8");
  let cloneNode = div11.cloneNode(true);
  let removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");
  removeButton.setAttribute("value", "Remove");

  removeButton.addEventListener("click", () => {
    cloneNode.remove();
  });

  cloneNode.appendChild(removeButton);
  div8.appendChild(cloneNode);

  let inputs = cloneNode.querySelectorAll("input");
  inputs.forEach((input) => {
    if (
      input.type != "button" &&
      input.type != "reset" &&
      input.type != "radio" &&
      input.type != "submit"
    ) {
      input.value = "";
    }
  });
});

document.getElementById("button3").addEventListener("click", (e) => {
  let div111 = document.getElementById("div111");
  let div10 = document.getElementById("div10");
  let cloneNode = div111.cloneNode(true);
  let removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");
  removeButton.setAttribute("value", "Remove");

  removeButton.addEventListener("click", () => {
    cloneNode.remove();
  });

  cloneNode.appendChild(removeButton);
  div10.appendChild(cloneNode);

  let inputs = cloneNode.querySelectorAll("input");
  inputs.forEach((input) => {
    if (
      input.type != "button" &&
      input.type != "reset" &&
      input.type != "radio" &&
      input.type != "submit"
    ) {
      input.value = "";
    }
  });
});
let stateData;
window.addEventListener("load", async (e) => {
  try {
    const stateResponse = await fetch("/api/state");
    stateData = await stateResponse.json();
    // console.log("State: ", stateData);
    stateData.forEach((state) => {
      const option = document.createElement("option");
      option.value = state?.state;
      option.label = state?.state;
      document.getElementById("state").appendChild(option);
    });
  } catch (error) {}
});

document.getElementById("state").addEventListener("change", async (e) => {
  const cityResponse = await fetch(`/api/city`);
  const cityData = await cityResponse.json();
  // console.log(cityData);
  // console.log("stateData: ", stateData);

  const stateIsoCode = stateData.filter(
    (state) => state.state === e.target.value
  );
  // console.log("stateIsoCode: ", stateIsoCode);

  const cityByState = cityData.filter(
    (city) => stateIsoCode[0].isoCode === city.stateCode
  );
  // console.log("cityByState: ", cityByState);

  // document.getElementById("city").childNodes.forEach((childNode) => {
  //   if (childNode.nodeName == "OPTION") {
  //     childNode.remove();
  //   }
  // });
  document.getElementById("city").remove();

  const city = document.createElement("select");
  city.setAttribute("id", "city");
  const previosElement = document.getElementById("cityLabel");
  previosElement.parentNode.insertBefore(city, previosElement.nextSibling);
  cityByState.forEach((city) => {
    const option = document.createElement("option");
    option.value = city?.city;
    option.label = city?.city;
    document.getElementById("city")?.appendChild(option);
  });
});

const createForm = document.getElementById("createForm");
createForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {};
  const formData = new FormData(createForm);
  for (const pair of formData.entries()) {
    console.log("pair: ", pair);
    if (Object.keys(data).includes(pair[0])) {
      const value = data[pair[0]];
      let Array = [value];
      Array.push(pair[1]);
      data[pair[0]] = Array.flat();
    } else {
      data[pair[0]] = pair[1];
    }
  }
  console.log("data: ", data);

  try {
    const response = await fetch("/applicants/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // const response = await fetch("/applicants/create", {
    //   method: "POST",
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //   },
    //   body: formData
    // })
    const result = await response.json();
    if (response.status === 200) {
      console.log(result.message);
      window.location.href = "/applicants/list";
    } else {
      console.log(result.message);
      console.log(result.data.error);
      throw new Error(result.data.error);
    }
  } catch (error) {
    console.log(error);
  }
});
