<template>
    <div>
        <div class="head">
            <h2 style="text-align:center; margin-bottom:50px">WELCOME TO OUR HOME PAGE</h2>
        </div>
        <div class="landing-page">
            <div>
                <b-card
                    title="Olympics 2020: Climbing"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text class="page-box">
                    Unless you’ve been living under a rock, rather than climbing up it, you’ll know that climbing is the new brunch - everyone is doing it.
                    </b-card-text>

                    <b-button href="#" variant="primary">Sport events</b-button>
                </b-card>
                </div>
                <div>
                <b-card
                    title="Business world"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text class="page-box">
                        Those looking for tomorrow's emerging innovations should look no further than this list of 2020 Business trends, as it offers the top industry insights from this year in an effort to pave the way for the new decade.
                    </b-card-text>

                    <b-button href="#" variant="primary">Last business trends</b-button>
                </b-card>
                </div>
                <div>
                <b-card
                    title="Rally"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2"
                >
                    <b-card-text class="page-box">
                        Former Hyundai WRC driver Hayden Paddon has warned rallying runs the risk of being "left behind" the longer it takes to embrace less polluting renewable energies.
                    </b-card-text>
                    <b-button href="#" variant="primary">Motor sports</b-button>
                </b-card>
                </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'LandingPage'
}
</script>
<style scoped>
    .landing-page{
        background: rgb(245, 244, 244);
        max-width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        padding: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .head{
        margin-top: 30px;
    }
    .page-box{
        min-height: 150px;
    }

</style>