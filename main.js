const scrollToTop = () => {
    const pos = document.documentElement.scrollTop || document.body.scrollTop;
    if (pos > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, pos - pos / 6);
    }
  };
  
  var xmlhttp = new XMLHttpRequest();
  url = "https://api.covid19india.org/data.json";
  xmlhttp.open("GET", url, true);
  
  xmlhttp.send();
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var stateAll = JSON.parse(this.responseText);
      console.log(stateAll);
  
      var xmlhttp = new XMLHttpRequest();
      url = "https://api.covid19india.org/state_district_wise.json";
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
  
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var allstd = JSON.parse(this.responseText);
          console.log(allstd);
  
          stateData = stateAll.statewise;
          var markup =
            "<tr class=topic><td style='text-align:left; border:0px'>" +
            "</td><td class=con>" +
            "Confirmed" +
            "</td><td class=reco>" +
            "Recovered" +
            "</td><td class=act style='text-align:center'>" +
            "Active" +
            "</td><td class=dea>" +
            "Deaths" +
            "</td></tr>";
          $("table").append(markup);
          for (i = 0; i < stateData.length; i++) {
            let stateName = stateData[i].state;
            let code = stateData[i].statecode;
            var confirmed = stateData[i].confirmed;
            var active = stateData[i].active;
            var death = stateData[i].deaths;
            var recover = stateData[i].recovered;
            if (i == 0) {
              var markup =
                "<tr style='font-size:2rem' id=" +
                code +
                "><td class='name' style='text-align:left'>" +
                stateName +
                "</td><td class='confirm'>" +
                confirmed +
                "</td><td class='rec'>" +
                recover +
                "</td><td class='active'>" +
                active +
                "</td><td class='death'>" +
                death +
                "</td></tr>";
              markup +=
                "<tr><td style='text-align:left; background-color: rgb(145, 228, 214);; '>State/UT</td></tr>";
              $("table").append(markup);
            } else {
              var markup =
                "<tr id=" +
                code +
                "><td class='name' style='text-align:left'>" +
                stateName +
                "</td><td class='confirm'>" +
                confirmed +
                "</td><td class='rec'>" +
                recover +
                "</td><td class='active'>" +
                active +
                "</td><td class='death'>" +
                death +
                "</td></tr>";
              $("table").append(markup);
            }
            try {
              document.getElementById(code).addEventListener("click", () => {
                var markup = "<table class=kara>";
                markup +=
                  "<tr class=topic><td style='text-align:left; background-color: rgb(145, 228, 214);;'>District" +
                  "</td><td class=con>" +
                  "Confirmed" +
                  "</td><td class=reco>" +
                  "Recovered" +
                  "</td><td class=act style='text-align:center'>" +
                  "Active" +
                  "</td><td class=dea>" +
                  "Deaths" +
                  "</td></tr>";
                try {
                  var dic = allstd[stateName].districtData;
                  for (var key in dic) {
                    markup +=
                      "<tr><td style='text-align:left'>" +
                      key +
                      "</td><td>" +
                      dic[key].confirmed +
                      "</td><td>" +
                      dic[key].recovered +
                      "</td><td>" +
                      dic[key].active +
                      "</td><td>" +
                      dic[key].deceased +
                      "</td><tr>";
                  }
                  markup += "</table>";
                  document.querySelector(".data").innerHTML = markup;
                } catch (err) {
                  document.querySelector(".data").innerHTML = "has no cases";
                  document.querySelector(".data").style.fontSize = "2rem";
                  document.querySelector(".data").style.margin = "1.4rem";
                  console.log(err);
                }
                document.querySelector(".st").innerHTML = stateName;
                document.querySelector(".st").style.backgroundColor =
                  "rgb(101, 206, 209)";
                scrollToTop();
              });
            } catch (err) {
                console.log(err)
            }
          }
        }
      };
    }
  };
  