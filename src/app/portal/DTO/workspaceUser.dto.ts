import { Workspace } from "./workspace.dto";
import { User } from "./user";

export class WorkspaceUser  {
    id ?: number;
    workspaces = new Workspace();
    users = new  User() ;
    status ?: string;
    token ?: string;

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