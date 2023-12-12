return {
    'nvimdev/dashboard-nvim',
    event = 'VimEnter',
    config = function()
        require('dashboard').setup {
            theme = "hyper",
            config = {
                project = { enable = true, limit = 8 },
            },
        }
    end,
    dependencies = { { 'nvim-tree/nvim-web-devicons' } }
}
