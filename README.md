# README

# chatspace DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|mail|string|null: false|
|name|string|index: true,null: false,unique: true|
### Association
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :messages

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false,unique: true|
### Association
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :messages

## messageテーブル
|Column|Type|Options|
|------|----|-------|
|image|string||
|body|text||
|user|references|null: false, foreign_key: true|
|group|references|foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
