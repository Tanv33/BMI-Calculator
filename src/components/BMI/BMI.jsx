import React, { useEffect, useRef, useState } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import MyNav from "../Appbar/Appbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function BMI() {
  const [personInfo, setPersonInfo] = useState({
    personName: "",
    weight: "",
    height: "",
  });
  let comment;
  let bmiResult;
  const [arr, setArr] = useState([]);
  const formRef = useRef("");

  useEffect(() => {
    const getArr = JSON.parse(localStorage.getItem("list"));
    if (getArr) {
      const newArr = getArr.filter(
        (element) => element.date > new Date().getTime()
      );
      setArr(newArr);
    }
  }, []);

  const handleSubmit = (a) => {
    a.preventDefault();
    bmiResult = (
      personInfo.weight / Math.pow(personInfo.height / 100, 2)
    ).toFixed(2);

    bmiResult >= 25
      ? (comment = "Over Weight")
      : bmiResult <= 18
      ? (comment = "Under Weight")
      : bmiResult === 21 || bmiResult === 22
      ? (comment = "Perfect Body")
      : (comment = "Healthy Body");
    let localArr = [
      {
        name: personInfo.personName,
        bmi: bmiResult,
        comment: comment,
        date: new Date().getTime() + 604800000,
      },
      ...arr,
    ];
    setArr([
      {
        name: personInfo.personName,
        bmi: bmiResult,
        comment: comment,
      },
      ...arr,
    ]);
    localStorage.setItem("list", JSON.stringify(localArr));
    formRef.current.reset();
  };

  return (
    <div>
      <MyNav />
      <Container>
        <form ref={formRef} onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "repeat(1, 1fr)",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 3,
                marginTop: 5,
                gridTemplateColumns: "repeat(1, 1fr)",
                textAlign: "center",
              }}
            >
              <Box>
                <TextField
                  id="outlined-basic"
                  placeholder="John"
                  variant="filled"
                  sx={{ width: "50vw" }}
                  color="secondary"
                  label="Enter Your Name"
                  type="text"
                  required
                  defaultValue={personInfo.personName}
                  onChange={(e) =>
                    setPersonInfo({
                      ...personInfo,
                      personName: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Enter Your Weight"
                  placeholder="Weight in KG"
                  variant="filled"
                  sx={{ width: "50vw" }}
                  color="secondary"
                  type="number"
                  required
                  defaultValue={personInfo.weight}
                  onChange={(e) =>
                    setPersonInfo({
                      ...personInfo,
                      weight: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Enter Your height"
                  placeholder="Height in cm"
                  variant="filled"
                  sx={{ width: "50vw" }}
                  color="secondary"
                  type="number"
                  required
                  defaultValue={personInfo.height}
                  onChange={(e) =>
                    setPersonInfo({
                      ...personInfo,
                      height: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <Button variant="contained" color="secondary" type="submit">
                  Calculate
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
        <Box sx={{ marginTop: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "purple" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    BMI Result
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="left">
                    Comment
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {arr?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.bmi}</TableCell>
                    <TableCell align="left">{row.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

export default BMI;
