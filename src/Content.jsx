import { useState } from "react";
import { Button, Stack, Input } from "@mui/material";
export default function Content() {
  const [insertVal, setInsertVal] = useState("");
  const [deleteVal, setDeleteVal] = useState("");
  return (
    <>
      <header style={{ padding: "16px 24px" }}>
        <Stack direction="row" gap={6}>
          <Stack direction="row" gap={1}>
            <Input
              id="filled-basic"
              size="small"
              label="Filled"
              variant="filled"
              color="success"
              placeholder="Insert node value..."
              value={insertVal}
              onChange={(e) => setInsertVal(e.target.value)}
            />
            <Button
              color="success"
              variant="contained"
              size="small"
              sx={{ padding: "10px 20px" }}
              onClick={() => setInsertVal("")}
            >
              insert
            </Button>
          </Stack>
          <Stack direction="row" gap={1}>
            <Input
              id="filled-basic"
              size="small"
              label="Filled"
              variant="filled"
              color="error"
              placeholder="Delete node value..."
              value={deleteVal}
              onChange={(e) => setDeleteVal(e.target.value)}
            />
            <Button
              color="error"
              variant="contained"
              size="small"
              sx={{ padding: "10px 20px" }}
              onClick={() => setDeleteVal("")}
            >
              delete
            </Button>
          </Stack>
          <Stack direction={"row"} gap={2} marginX={"auto"}>
            <Button
              color="primary"
              variant="contained"
              sx={{ padding: "10px 20px" }}
            >
              Clear
            </Button>
            <Button
              color="secondary"
              variant="contained"
              sx={{ padding: "10px 20px" }}
            >
              reset
            </Button>
          </Stack>
        </Stack>
      </header>
      <div id="tree"></div>
    </>
  );
}
