// src/server.ts
import app from './app';

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
