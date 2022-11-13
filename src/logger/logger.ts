import chalk from 'chalk';
import util from 'util';

class Logger {
    static info(s: string) {
        console.log(s);
    }

    static deepInfo(s: any) {
        console.log(util.inspect(s, false, null, true));
    }

    static title(s: string) {
        console.log(chalk.blue(s));
    }

    static warn(s: string) {
        console.log(chalk.yellow(s));
    }

    static success(s: string) {
        console.log(chalk.green(s));
    }

    static error(s: string) {
        console.log(chalk.red(s));
    }

    static emptyLine() {
        console.log();
    }
}

export default Logger;