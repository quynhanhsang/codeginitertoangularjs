<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class User extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'userName'       => [
                    'type'       => 'VARCHAR',
                    'constraint' => '100',
                    'null' => true,
            ],
            'passWord' => [
                    'type' => 'TEXT',
                    'null' => true,
            ],
            'level' => [
                    'type' => 'INT',
                    'unsigned'       => true,
                    'auto_increment' => false,
            ],
            'tennantId' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'email' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'name' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'subName' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '100',
            ],
            'creaTime' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
            'editTime' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
            'isDelete' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ],
            'userId' => [
                'type' => 'INT',
                'unsigned' => true,
                'auto_increment' => false,
            ],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('user');
    }

    public function down()
    {
        $this->forge->dropTable('user');
    }
}
