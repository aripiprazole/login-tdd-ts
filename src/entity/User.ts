import { Column } from "typeorm";
import { Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { VisibleUser } from "./VisibleUser";

@Entity()
export class User extends VisibleUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;
}

export default User;
