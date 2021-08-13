<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Gallery extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                    'type'           => 'INT',
                    // 'constraint'     => 11,
                    'unsigned'       => true,
                    'auto_increment' => true,
            ],
            'title' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'slug' => [
                    'type' => 'TEXT',
                    'null' => true,
            ],
            'description' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'tennantId' => [
                'type' => 'INT',
                'null' => true,
            ],
            'creatTime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'editTime' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'isDelete' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ],
            'isActive' => [
                'type' => 'BOOLEAN',
                'null' => false,
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('gallery');
    }

    public function down()
    {
        $this->forge->dropTable('gallery');
    }
}
