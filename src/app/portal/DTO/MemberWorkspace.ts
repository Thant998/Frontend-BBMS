import { Board } from "./board.dto";

export class MemberWorkspace{

    id ?: number;
    name ?: string;
    description ?: string;
    boards ?: [Board] ;
    userId ?: number;
    inviteEmail ?: string[] = []; 
}