import { Board } from "./board.dto";
import { Workspace } from "./workspace.dto";
import { WorkspaceBoard } from "./workspaceBoard";

export class WorkspaceDTO
{
    workspace ?:[Workspace];
    boards ?:[WorkspaceBoard];

}


// import { Workspace } from './workspace';
// import { User } from "./User";
// import { BoardUser } from './BoardUser';

// export class Board {

//     id ?: number;
//     name ?: string; 
//     description ?: string;
//     boarduser ?: BoardUser[] = [];
//     date ?: Date;
//     deletestatus ?: boolean;
//     workspaces ?: Workspace;
//     inviteEmail ?: string[] = []; 

// } 