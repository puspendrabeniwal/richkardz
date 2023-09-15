/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/signin'
            }
        ];
    }
}

module.exports = nextConfig
