import { Bot } from "./bot";

export class IgnoreBot extends Bot {
	protected handleMessage(message: any): void {}
	protected handleStatusChaged(message: any): void {}
}
