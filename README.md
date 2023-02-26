# Social Blocks

![Social Blocks](logo.png)

## Repo for the Social Blocks DApp on ArcBlock

- This project can be deployed on a Blocklet Server and allows for only one user per an instance.
- Once a user authenticates with DID Wallet, they are the sole owner.
- If deployed to a production server, you can easily map your site to the domain of your choice.

## Contributing

- Please feel free to inquire about any unassigned issues or make a pull request after forking the repository.
- If making a commit. Please clear the database folder, add an empty app.db file, and restart the application first.

## Using Blocklet Server and Blocklet CLI

```shell
yarn global add @blocklet/cli
git clone https://github.com/vmcodes/social-blocks
cd social-blocks
yarn install
yarn build
blocklet server init --mode debug
blocklet server start
blocklet dev
```

## Local Development without the Blocklet CLI

- Install all dependencies for the server and client.

```shell
yarn install
```

- Build entire project.

```shell
yarn build
```

- Run backend and serve frontend build folder.

```shell
yarn start
```

## Deploying on Blocklet Server

```shell
yarn build
yarn bundle
yarn deploy
```

## License

This code is licensed under the ISC license found in the [LICENSE](LICENSE) file.
