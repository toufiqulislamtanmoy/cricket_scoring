import app from "./app.js";
import dev from "./config/config.js";

app.listen(dev.app.port, () => {
  console.log(`Server is running on http://localhost:${dev?.app?.port}`);
});
