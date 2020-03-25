import createApp from "@app/app";

async function loadApp() {
    const app = await createApp(true);

    const port = process.env.PORT;

    app.listen(port ? parseInt(port, 10) : 8000);

    console.info("Server successfully started");
}

loadApp();
