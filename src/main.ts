#!/usr/bin/env node
import { Command } from 'commander';
import LavaSDK from './sdk/sdk';
import Logger from './logger/logger';

async function run() {
    // Add an extra empty line at beginning of the program
    Logger.emptyLine()

    // Initialize commander object
    const program = new Command();

    // Initialize root command
    program
    .name('Lava SDK')
    .description('An SDK for interacting with Lava client')
    .version('0.0.1')
    
    // Initialize sub commands
    program.command('get-paring')
    .description('Gets the pairing list for current epoch')
    .requiredOption(
        '-e, --endpoint <endpoint>',
        'An lava node Endpoint'
    )
    .requiredOption(
        '-c, --chainId <chain-id>',
        'An lava network chain ID'
    )
    .requiredOption(
        '-m, --mnemonic <mnemonic>',
        'The client mnemonic'
    )
    .requiredOption(
        '-r, --rpcInterface <rpc-interface>',
        'A used rpc interface'
    )
    .action(async(option, _) => {
        await getPairing(
            option.endpoint,
            option.chainID,
            option.mnemonic,
            option.rpcInterface,
        )
    });

    // Parse program
    program.parse();
}

async function getPairing(
    endpoint:string,
    chainID:string,
    mnemonic:string,
    rpcInterface:string,
) {
    const lavaSDK = new LavaSDK(
        endpoint,
        chainID,
        mnemonic,
        rpcInterface
    )
    
    await lavaSDK.init();

}

run()
    .then()
    .catch((err) => {
        Logger.error(err);
    });