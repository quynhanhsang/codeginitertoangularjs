<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Blog extends Migration
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
            'editedBy' => [
                    'type' => 'TEXT',
                    'null' => true,
            ],
            'description' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'tag' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'target' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'categoryId'          => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'viewCount'          => [
                'type'           => 'INT',
                'unsigned'       => false,
                'auto_increment' => false,
                'null' => true,
            ],
            'seoTitle' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoAlias' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoKeywords' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'seoDescription' => [
                'type' => 'VARCHAR',
                'null' => true,
                'constraint' => '200',
            ],
            'sortOrder' => [
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
        $this->forge->createTable('blog');
    }

    public function down()
    {
        $this->forge->dropTable('blog');
    }
}
