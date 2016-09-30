import {Injectable} from "@angular/core";
import {SQLite} from 'ionic-native';
import {Subject} from "rxjs";

@Injectable()
export class StorageService {

    private database: SQLite;
    private tablesToCreate = [
        'last_products'
    ]
    private lastProductStream = new Subject();

    constructor() {
        this.database = new SQLite();
        this.database.openDatabase({
            name: "janari",
            location: 'default',
            androidDatabaseImplementation: 2,
            androidLockWorkaround: 1
        });

        let self = this;

        this.tablesToCreate.forEach((table) => {
            self.database.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table} (data)`,
                {}
            );
        });

        this.database.executeSql(
            `SELECT * FROM last_products`,
            {}
        ).then((resp) => {
            const rows = resp.res.rows;

            for (let i = 0; i < rows.length; i++) {
                this.lastProductStream.next(JSON.parse(rows[i].data.replace(/§/g, '"')));
            }
        });
    }

    insertLastSeenProduct(product: any) {
        const encodedProduct = JSON.stringify(product).replace(/"/g, '§');

        this.database.executeSql(
            `SELECT * FROM last_products WHERE data = "${encodedProduct}"`,
            {}
        ).then((resp) => {
            const rows = resp.res.rows;
            if (rows.length > 0) {
                this.database.executeSql(
                    `DELETE FROM last_products WHERE data = "${encodedProduct}"`,
                    {}
                );
            }

            this.lastProductStream.next(product);
            this.database.executeSql(
                `INSERT INTO last_products(data) values("${encodedProduct}")`,
                {}
            );
        });
    }

    getLastProductsObervable() {
        return this.lastProductStream;
    }
}
