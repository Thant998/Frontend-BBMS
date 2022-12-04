import { Board } from "./board.dto";

export class Workspace{

    workspaceId !: number;
    workspaceName !: string;
    description !: string;
    boards ?: [Board] ;
    userId !: number;
    inviteEmail ?: string[] = []; 
}

