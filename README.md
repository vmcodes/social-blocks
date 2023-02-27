# Social Blocks

![Social Blocks](logo.png)

## Repo for the Social Blocks DApp on ArcBlock

- This project can be deployed on a Blocklet Server and allows for only one user per an instance.
- Once a user authenticates with their wallet, this is the only way for them to login.

## Contributing

- Please feel free to inquire about any unassigned issues or make a pull request after forking the repository.
- If making a commit. Please clear the database folder, add an empty app.db file, and restart the application first.

## Local Development

- Build backend

```shell
docker compose up -d
```

- Start Frontend

```shell
yarn dev:install
yarn dev:client
```

## License

This code is licensed under the ISC license found in the [LICENSE](LICENSE) file.
