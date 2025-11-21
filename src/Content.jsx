import Tree from "./Tree";
import { Button, Stack, Input } from "@mui/material";
export default function Content() {
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
            />
            <Button
              color="success"
              variant="contained"
              size="small"
              sx={{ padding: "10px 20px" }}
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
            />
            <Button
              color="error"
              variant="contained"
              size="small"
              sx={{ padding: "10px 20px" }}
            >
              delete
            </Button>
          </Stack>
          <Button
            color="primary"
            variant="contained"
            sx={{ padding: "10px 20px", marginX: "auto" }}
          >
            Clear
          </Button>
        </Stack>
      </header>
      <div id="tree">
        <Tree />
      </div>
    </>
  );
}
