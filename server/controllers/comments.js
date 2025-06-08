import CommentsModel from '../models/comments.js';
import UserModel from '../models/user.js';


export const createComment = async (req, res) => {
    const { user_id, post_id, content } = req.body;
    try {

        // Validações simples
        if (!user_id || !post_id || !content) {
            return res.status(400).json({ message: 'Todos os campos têm de ser preenchidos' });
        }

        // Verifica se o usuário existe
        const user = await UserModel.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o post existe
        const post = await CommentsModel.findOne({ where: { post_id } });
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }

        if (typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ message: 'Conteúdo do comentário inválido' });
        }

        const newComment = await CommentsModel.create({
            user_id,
            post_id,
            content
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCommentsByPost = async (req, res) => {
    const { post_id } = req.params;
    try {
        const comments = await CommentsModel.findAll({
            where: { post_id },
            include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'photo'] // Inclui apenas os campos necessários do usuário
                }
            ],
            order: [['createdAt', 'DESC']] // Ordena os comentários pela data de criação
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}