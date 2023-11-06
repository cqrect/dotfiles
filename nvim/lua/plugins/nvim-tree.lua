return {
	"nvim-tree/nvim-tree.lua",
	version = "*",
	lazy = false,
	dependencies = { "nvim-tree/nvim-web-devicons" },
	keys = {
		{ "<C-o>", "<cmd>NvimTreeToggle<CR>", desc = "Toggle NvimTree" },
	},
	config = function()
		local function my_on_attach(bufnr)
			local api = require("nvim-tree.api")

			local function opts(desc)
				return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
			end

			api.config.mappings.default_on_attach(bufnr)

			vim.keymap.set("n", "<C-y>", api.fs.copy.absolute_path, opts("Copy absolute path"))
		end

		require("nvim-tree").setup({
			notify = {
				-- threshold = vim.log.levels.WARN,
			},
			on_attach = my_on_attach,
		})
	end,
}
