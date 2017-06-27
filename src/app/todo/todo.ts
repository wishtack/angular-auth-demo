/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

export class Todo {

    id?: string;
    description?: string;

    constructor(args: Todo) {
        this.id = args.id;
        this.description = args.description;
    }

}
