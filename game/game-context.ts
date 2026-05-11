export class GameContext {
  private static _cliArgs: Map<string, string> | null = null;

  static get isDebug(): boolean {
    return Boolean(this._getCliArg("--debug"));
  }

  static get isNoclip(): boolean {
    return Boolean(this._getCliArg("--noclip"));
  }

  private static _getCliArg(argName: string): string | undefined {
    if (this._cliArgs === null) {
      this._cliArgs = new Map<string, string>(Deno.args.map((cliArg) => {
        return [cliArg, "true"];
      }));
    }

    return this._cliArgs.get(argName);
  }
}
